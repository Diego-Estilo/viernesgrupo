// ===========================================
// SUPABASE CONFIGURATION  
// ===========================================

(function() {
    const SUPABASE_URL = 'https://xrmopbybjfynhrksntjs.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhybW9wYnliamZ5bmhya3NudGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMjU5NjgsImV4cCI6MjA5MzYwMTk2OH0.HrbYsvC5kmSJOk_xi4iJo-na3DXBD_hMI_3VVLIj7rI';

    try {
        if (typeof supabase === 'undefined') {
            throw new Error('El SDK de Supabase no se ha cargado correctamente desde el CDN.');
        }
        
        if (typeof window.supabase.createClient === 'function') {
            window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase inicializado correctamente');
        } else {
            // Esto previene errores si window.supabase ya existe pero no es el cliente
            console.warn('⚠️ Supabase ya estaba inicializado o el objeto es inválido');
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
})();