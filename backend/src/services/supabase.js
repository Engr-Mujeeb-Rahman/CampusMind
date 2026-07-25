const { createClient } = require('@supabase/supabase-js');
const config = require('../config');

let supabaseClient = null;

function getClient() {
  if (!supabaseClient) {
    const { url, anonKey, serviceRoleKey } = config.supabase;

    if (!url || (!anonKey && !serviceRoleKey)) {
      return null;
    }

    const key = serviceRoleKey || anonKey;
    supabaseClient = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabaseClient;
}

function getServiceClient() {
  if (!config.supabase.url || !config.supabase.serviceRoleKey) {
    return null;
  }

  return createClient(config.supabase.url, config.supabase.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

const supabase = {
  getClient,
  getServiceClient,

  isConfigured() {
    return !!config.supabase.url && !!config.supabase.anonKey;
  },
};

module.exports = supabase;
