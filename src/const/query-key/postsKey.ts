export const postsKey = {
  base: ['posts'] as const,
  postList: () => [...postsKey.base, 'list'] as const,
} as const
