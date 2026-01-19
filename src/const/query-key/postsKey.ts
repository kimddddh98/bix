export const postsKey = {
  base: ['posts'] as const,
  postList: () => [...postsKey.base, 'list'] as const,
  categories: () => [...postsKey.base, 'categories'] as const,
} as const
