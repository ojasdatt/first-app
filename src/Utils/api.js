import { OMDB_API_KEY, GROQ_API_KEY, GROQ_MODELS } from '../config';

//patterns for ratings
const _sr = ['Rw==','VFYtRw==','VFYtUEc=','VFYtMTQ='].map(atob);
const _isSafe = r => !!r && _sr.some(s => r.toUpperCase() === s.toUpperCase());

export async function omdbSearch(query) {
    //check for missing api key
  if (!OMDB_API_KEY) { console.warn('[OMDb] No API key'); return []; }
  //Removes colons periods spaces for easier Search
  const original = query.trim();
  const cleaned  = original.replace(/\.(?=[A-Za-z])/g, '').replace(/[:.]/g, ' ').replace(/\s+/g, ' ').trim();
  // Will search twice if the version differs.
  const terms    = [...new Set([original, cleaned])];
  //returns an array of movie results
  const fetchTerm = term =>
    fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(term)}&type=movie`)
      .then(r => r.json())
      .then(d => d.Response === 'True' ? d.Search : [])
      .catch(() => []);
  //Ensures movies only appear once.
  const seen = new Set(), merged = [];
  for (const arr of await Promise.all(terms.map(fetchTerm)))
    for (const m of arr)
      if (!seen.has(m.imdbID)) { seen.add(m.imdbID); merged.push(m); }
  // logs the ratings
  const withRatings = await Promise.all(
    merged.map(m =>
      fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${m.imdbID}`)
        .then(r => r.json()).then(d => {
          console.log(`[OMDb] ${m.Title} (${m.imdbID}): Rated="${d.Rated}"`);
          return { ...m, Rated: d.Rated || '' };
        }).catch(() => m)
    )
  );
  const filtered = withRatings.filter(m => _isSafe(m.Rated));
  console.log(`[OMDb] Search "${query}": ${merged.length} total, ${filtered.length} after filter`);
  return filtered;
}

export async function omdbDetails(imdbID) {
  if (!OMDB_API_KEY) { console.warn('[OMDb] No API key'); return null; }
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${encodeURIComponent(imdbID)}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
  } catch {
    return null;
  }
}

//makes sure theres a api key
export async function callGroq(messages, modelIndex = 0) {
  if (!GROQ_API_KEY) { console.error('[Groq] No API key'); return { error: 'no_key' }; }
  const model = GROQ_MODELS[modelIndex];
  //if the all models fails o respond in 25 seconds, it aborts(canceling the request)
  if (!model) return { error: 'all_models_failed' };
  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), 25000);

  try{
    //taking your info and asking Grok.
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, max_tokens: 800, temperature: 0.75 }),
      signal: controller.signal,
    });
    // make sure the abort timer starts after the rewuest been sent.
    clearTimeout(timeout);
    //sends error if invalid/missing Api key
    if (res.status === 401 || res.status === 403) return { error: 'auth' };
    if (res.status === 429 || !res.ok)
      // if it's a invalid response, it will try another model, if no models, return error.
      return modelIndex + 1 < GROQ_MODELS.length ? callGroq(messages, modelIndex + 1) : { error: res.status === 429 ? 'rate_limit' : 'server_error' };
    //extracts the models reply
      const reply = (await res.json())?.choices?.[0]?.message?.content?.trim() || '';
    // retries with the next model
      if (!reply) 
        return modelIndex + 1 < GROQ_MODELS.length ? callGroq(messages, modelIndex + 1) : { error: 'empty_reply' };
        return { success: true, reply };
// handles network errors/timeouts. If request aborted, treat as timeout, try another model. Otherwise: network error
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') return modelIndex + 1 < GROQ_MODELS.length ? callGroq(messages, modelIndex + 1) : { error: 'timeout' };
    return { error: 'network_error' };
  }
}