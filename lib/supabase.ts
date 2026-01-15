import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pklqgaezowzovewyjxxh.supabase.co';
const supabaseKey = 'sb_publishable_tMGCmp0iqj8hXsTIlEK6kQ_ExVBA8Ps';

export const supabase = createClient(supabaseUrl, supabaseKey);