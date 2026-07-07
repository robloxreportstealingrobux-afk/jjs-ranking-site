import { createClient } from '@supabase/supabase-js'

// This uses the PUBLIC/ANON key only — never put SUPABASE_SERVICE_KEY
// (the one from your bot's config.py) here. The anon key is safe to
// ship in frontend code because your Supabase Row Level Security
// policies (not this key) control what it's allowed to read/write.
//
// Set these in a .env.local file at the project root (already covered
// by your .gitignore) so you don't have to hardcode them:
//   REACT_APP_SUPABASE_URL=https://hzwsnmzdkcvawhbnkuhz.supabase.co
//   REACT_APP_SUPABASE_ANON_KEY=sb_publishable_...
const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL || 'https://hzwsnmzdkcvawhbnkuhz.supabase.co'
const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_uuWGU9HX9uj3EbIiFG-2EQ_s6cdFBWD'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
