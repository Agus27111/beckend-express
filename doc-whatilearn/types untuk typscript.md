buat file untuk mendefinisikan type dari tiap model tabel.

buat file user.type.ts di folder types


```js
export default interface UserType {
  user_id: string
  email: string
  nama: string
  password: string
  confirmPassword?: string
  role: string
}

```

gunakan ini pada controller atau pada services di prisma

ini contoh pada services di prisma


```ts
import type UserType from '../types/user.type'
import prisma from '../utils/client'

export const createUser = async (payload: UserType): Promise<UserType> => {
  const data = await prisma.user.create({
    data: {
      ...payload
    }
  })
  return data
}

export const userLogin = async (
  payload: UserType
): Promise<UserType | null> => {
  const data = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  })
  return data
}

```
