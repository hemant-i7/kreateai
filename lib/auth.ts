import { cookies } from 'next/headers'

export function getUser() {
  const token = cookies().get('auth_token')
  return token ? { id: '1', name: 'User' } : null
}