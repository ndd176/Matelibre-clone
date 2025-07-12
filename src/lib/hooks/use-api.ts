import { useState, useEffect, useCallback } from 'react'
import api from '@/lib/api/strapi-api'

// Generic hook state interface
interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// Generic API hook
function useApi<T>(
  apiCall: () => Promise<any>,
  dependencies: any[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      setData(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('API Hook Error:', err)
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

// Job Positions Hooks
export function useJobPositions(params?: {
  page?: number
  pageSize?: number
  sort?: string
  filters?: Record<string, any>
}) {
  return useApi(
    () => api.jobPositions.getAll(params),
    [params?.page, params?.pageSize, params?.sort, JSON.stringify(params?.filters)]
  )
}

export function useJobPosition(id: number) {
  return useApi(
    () => api.jobPositions.getById(id),
    [id]
  )
}

// Hero Slides Hook
export function useHeroSlides(sort?: string) {
  return useApi(
    () => api.heroSlides.getAll({ sort }),
    [sort]
  )
}

// Moments Hook
export function useMoments(params?: {
  page?: number
  pageSize?: number
  sort?: string
  filters?: Record<string, any>
}) {
  return useApi(
    () => api.moments.getAll(params),
    [params?.page, params?.pageSize, params?.sort, JSON.stringify(params?.filters)]
  )
}

// Testimonials Hook
export function useTestimonials(params?: {
  page?: number
  pageSize?: number
  sort?: string
  filters?: Record<string, any>
}) {
  return useApi(
    () => api.testimonials.getAll(params),
    [params?.page, params?.pageSize, params?.sort, JSON.stringify(params?.filters)]
  )
}

// Products Hook
export function useProducts(params?: {
  page?: number
  pageSize?: number
  sort?: string
  filters?: Record<string, any>
}) {
  return useApi(
    () => api.products.getAll(params),
    [params?.page, params?.pageSize, params?.sort, JSON.stringify(params?.filters)]
  )
}

export function useProduct(id: number) {
  return useApi(
    () => api.products.getById(id),
    [id]
  )
}

export function useProductsByCategory(slug: string) {
  return useApi(
    () => api.products.getByCategorySlug(slug),
    [slug]
  )
}

// FAQ Hook
export function useFAQ(params?: {
  sort?: string
  filters?: Record<string, any>
}) {
  return useApi(
    () => api.faq.getAll(params),
    [params?.sort, JSON.stringify(params?.filters)]
  )
}

// Team Hook
export function useTeam(params?: {
  sort?: string
  filters?: Record<string, any>
}) {
  return useApi(
    () => api.team.getAll(params),
    [params?.sort, JSON.stringify(params?.filters)]
  )
}

// Site Settings Hook
export function useSiteSettings() {
  return useApi(
    () => api.settings.get(),
    []
  )
}

// Mutation hooks for create/update/delete operations
export function useCreateJobPosition() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createPosition = async (data: Record<string, any>) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.jobPositions.create(data)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create position'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    createPosition,
    loading,
    error
  }
}

export function useUpdateJobPosition() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updatePosition = async (id: number, data: Record<string, any>) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.jobPositions.update(id, data)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update position'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    updatePosition,
    loading,
    error
  }
}

export function useDeleteJobPosition() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deletePosition = async (id: number) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.jobPositions.delete(id)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete position'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    deletePosition,
    loading,
    error
  }
}

// Contact form submission hook
export function useContactForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitForm = async (data: {
    name: string
    email: string
    subject?: string
    message: string
  }) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      const response = await api.contact.submit(data)
      setSuccess(true)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit form'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
  }

  return {
    submitForm,
    loading,
    error,
    success,
    reset
  }
}

// Newsletter subscription hook
export function useNewsletter() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const subscribe = async (email: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      const response = await api.newsletter.subscribe(email)
      setSuccess(true)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to subscribe'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
  }

  return {
    subscribe,
    loading,
    error,
    success,
    reset
  }
}

// File upload hook
export function useFileUpload() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const uploadFile = async (file: File) => {
    try {
      setLoading(true)
      setError(null)
      setProgress(0)
      
      // Simulate progress (in real implementation, you might use XMLHttpRequest for progress tracking)
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 100)

      const response = await api.upload.uploadFile(file)
      
      clearInterval(interval)
      setProgress(100)
      
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload file'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
      setTimeout(() => setProgress(0), 1000) // Reset progress after 1 second
    }
  }

  return {
    uploadFile,
    loading,
    error,
    progress
  }
}

// Custom hook for paginated data
export function usePaginatedData<T>(
  apiCall: (params: any) => Promise<any>,
  initialParams: any = {}
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [params, setParams] = useState(initialParams)

  const fetchData = useCallback(async (pageNum: number, reset = false) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiCall({
        ...params,
        page: pageNum,
        pageSize: 10
      })
      
      const newData = response.data
      const pagination = response.meta.pagination
      
      if (reset) {
        setData(newData)
      } else {
        setData(prev => [...prev, ...newData])
      }
      
      setHasMore(pageNum < pagination.pageCount)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [apiCall, params])

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchData(nextPage)
    }
  }

  const refresh = () => {
    setPage(1)
    setData([])
    setHasMore(true)
    fetchData(1, true)
  }

  const updateParams = (newParams: any) => {
    setParams(newParams)
    setPage(1)
    setData([])
    setHasMore(true)
  }

  useEffect(() => {
    fetchData(1, true)
  }, [fetchData])

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    updateParams
  }
}

// Search hook
export function useSearch<T>(
  apiCall: (searchTerm: string) => Promise<any>,
  debounceMs = 300
) {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiCall(searchTerm)
        setResults(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed')
      } finally {
        setLoading(false)
      }
    }, debounceMs)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, apiCall, debounceMs])

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    error
  }
}
