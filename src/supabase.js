import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xrmopbybjfynhrksntjs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhybW9wYnliamZ5bmhya3NudGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMjU5NjgsImV4cCI6MjA5MzYwMTk2OH0.HrbYsvC5kmSJOk_xi4iJo-na3DXBD_hMI_3VVLIj7rI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase inicializado en React');
