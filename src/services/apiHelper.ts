import { usePokemonStore } from '~/stores/pokemon';

export interface ApiCallOptions {
  setLoading?: boolean;
  clearError?: boolean;
}

export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  errorMessage: string = 'An error occurred',
  options: ApiCallOptions = {}
): Promise<T | null> {
  const { setLoading = true, clearError = true } = options;
  const store = usePokemonStore();

  if (setLoading) {
    store.setLoading(true);
  }
  
  if (clearError) {
    store.setError(null);
  }
  
  try {
    const result = await apiCall();
    return result;
  } catch (err) {
    store.setError(err instanceof Error ? err.message : errorMessage);
    return null;
  } finally {
    if (setLoading) {
      store.setLoading(false);
    }
  }
}
