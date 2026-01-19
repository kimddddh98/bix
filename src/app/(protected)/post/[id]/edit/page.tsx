import { redirect } from 'next/navigation'

type PageProps = {
  params: Promise<{ id: string }>
}
export default async function EditPage({ params }: PageProps) {
  const { id } = await params

  return redirect(`/post/${id}`)
}
