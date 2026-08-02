import { createClient } from '@supabase/supabase-js';

// We fall back to process.env but you can also hardcode them here 
// if you aren't using a full .env file yet.
const supabaseUrl = process.env.SUPABASE_URL || "https://pjupqgyaxqhbejexvbcj.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "sb_publishable_lkoG-K1djws2cTiQJMDc2A_34tbRjDu";

export const supabase = createClient(supabaseUrl, supabaseKey);
