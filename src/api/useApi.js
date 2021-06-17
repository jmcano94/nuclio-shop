import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://fakestoreapi.com/';
// eslint-disable-next-line import/prefer-default-export
export const useApi = (options = { path: undefined, skip: false }) => {
  const { path, skip } = options;
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState();
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refresh = () => {
    setRefreshIndex(refreshIndex + 1);
  };

  const finalUrl = url + path;

  useEffect(() => {
    let cancelled = false;
    if (skip) {
      setResult(null);
      setLoading(false);
      setLoaded(false);
    } else {
      setLoading(true);
      axios
        .get(url)
        .then((r) => {
          if (!cancelled) {
            setResult(r.data);
            setLoading(false);
            setLoaded(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            setError(error.response.data);
          } else {
            setError(error.message);
          }
        });
    }
    return () => {
      cancelled = true;
    };
  }, [url, refreshIndex, skip]);

  return [result, loading, loaded, error, refresh, setResult];
};
