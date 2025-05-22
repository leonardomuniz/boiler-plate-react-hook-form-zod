'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

const schema = z.object({
  firstName: z.string(),
  gender: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
})

type FormInput = z.infer<typeof schema>

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<FormInput>({
    defaultValues: {
      firstName: 'Léo',
      gender: GenderEnum.male,
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('chegou aqui')
      throw new Error()
    } catch (error) {
      console.error(JSON.stringify(error))
      setError('firstName', {
        message: 'Escolhe oto nome',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Primeiro nome: </label>
      <input {...register('firstName')} type="text" />
      <br />

      <label>E-mail: </label>
      <input {...register('email')} type="email" />
      <br />

      <label>Senha: </label>
      <input {...register('password')} type="password" />
      <br />
      <label>Seleção de genero</label>
      <select {...register('gender')} defaultValue="female">
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <br />
      <button type="submit" disabled={isSubmitting}>
        enviar
      </button>
    </form>
  )
}
