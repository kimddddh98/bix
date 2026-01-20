import {
  CategoryKey,
  editPost,
  Post,
  Posts,
  WritePostRequsetParams,
} from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useEditPostMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: WritePostRequsetParams & { id: number }) => {
      const { id, ...p } = params
      return editPost(id, p)
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: postsKey.postList() })
      await queryClient.cancelQueries({ queryKey: postsKey.post(variables.id) })

      const previousPostListData = queryClient.getQueryData<
        InfiniteData<PagenationResponse<Posts[]>>
      >(postsKey.postList())

      const previousPostData = queryClient.getQueryData<Post>(
        postsKey.post(variables.id)
      )

      if (variables.category) {
        queryClient.setQueryData<InfiniteData<PagenationResponse<Posts[]>>>(
          postsKey.postList(),
          (olddata) => {
            if (!olddata) return olddata

            const updatedPages = olddata.pages.map((page) => {
              const updatedContent = page.content.map((post) => {
                if (post.id === variables.id) {
                  return {
                    ...post,
                    title: variables.title,
                    category: variables.category as CategoryKey,
                  }
                }
                return post
              })

              return {
                ...page,
                content: updatedContent,
              }
            })
            return {
              ...olddata,
              pages: updatedPages,
            }
          }
        )
      }

      if (previousPostData) {
        queryClient.setQueryData<Post>(postsKey.post(variables.id), {
          ...previousPostData,
          title: variables.title,
          content: variables.content,
          boardCategory: variables.category as CategoryKey,
        })
      }

      return { previousPostListData, previousPostData }
    },
    onError: (error, variables, context) => {
      if (context?.previousPostListData) {
        queryClient.setQueryData(
          postsKey.postList(),
          context.previousPostListData
        )
      }
      if (context?.previousPostData) {
        queryClient.setQueryData(
          postsKey.post(variables.id),
          context.previousPostData
        )
      }
    },
    onSuccess: () => {
      router.back()
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: postsKey.post(variables.id) })
    },
  })
}
export default useEditPostMutation
