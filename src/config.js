export const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY || '';
export const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || '';
export const GROQ_MODELS = (process.env.REACT_APP_GROQ_MODELS || 'gpt-4o-mini').split(',').map(model => model.trim()).filter(Boolean);
