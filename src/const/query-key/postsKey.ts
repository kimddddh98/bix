export const postsKey = {
  base: ['posts'] as const,
  postList: () => [...postsKey.base, 'list'] as const,
  categories: () => [...postsKey.base, 'categories'] as const,

  post: (id: number) => [...postsKey.base, id] as const,
} as const
