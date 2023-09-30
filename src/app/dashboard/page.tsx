'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/ui/card'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { RiImageAddLine } from 'react-icons/ri'

function App () {
  const [file, setFile] = useState<File | null>(null)
  const [imageURL, setImageURL] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    console.debug('Drag over')
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleOnIncorrectFile = () =>
    toast({
      title: 'Incorrect file type',
      description: 'You should upload an image file.',
    })

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    const selectedFile = files[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)

      // Crea una URL temporal para el archivo y la establece para mostrar la imagen.
      const objectURL = URL.createObjectURL(selectedFile)
      setImageURL(objectURL)
    } else {
      // Trigger: Aquí puedes disparar un evento para manejar archivos no válidos.
      console.log('El archivo seleccionado no es una imagen.')
      handleOnIncorrectFile()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    // Verifica si se seleccionó un archivo y si es una imagen.
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)

      // Crea una URL temporal para el archivo y la establece para mostrar la imagen.
      const objectURL = URL.createObjectURL(selectedFile)
      setImageURL(objectURL)
    } else {
      // Trigger: Aquí puedes disparar un evento para manejar archivos no válidos.
      console.log('El archivo seleccionado no es una imagen.')
      handleOnIncorrectFile()
    }
  }

  useEffect(() => {
    console.debug('File: ', file)
    console.debug('Image URL: ', imageURL)
  }, [file, imageURL])
  return (
    <main className='flex justify-center flex-col gap-5 items-center min-h-screen'>
      <h1 className='text-6xl font-bold'>Dashboard</h1>
      <div className='w-10/12 gap-5 grid grid-cols-3'>
        <Card className='p-2 relative'>
          {imageURL ? (
            <Image
              className='h-full w-full rounded-md'
              width={350}
              height={450}
              src={imageURL}
              alt='Subido'
            />
          ) : (
            <label
              className={`w-full h-full rounded-md text-slate-400 text-center flex justify-center items-center transition-all ease-in-out cursor-pointer hover:border-green-400 hover:text-green-400 flex-col gap-5 ${
                isDragging
                  ? 'border-green-400 bg-green-100'
                  : 'border-slate-400'
              } border-spacing-4 border-4 border-dashed`}
              draggable
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              htmlFor='imageATT'
            >
              <RiImageAddLine className='text-8xl' />
              <p className='w-3/4 break-words'>
                Select or drag and drop an image for the token
              </p>
            </label>
          )}
          <input
            onChange={handleFileChange}
            type='file'
            placeholder='something'
            name='imageATT'
            id='imageATT'
            className='hidden'
          />
        </Card>
        <Card className='col-span-2'>
          <CardHeader>
            <CardTitle>NFT Collection Data</CardTitle>
            <CardDescription>
              Create your own Attendance Token data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    id='name'
                    placeholder='Name of your Attendance Token'
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='symbol'>Symbol</Label>
                  <Input id='symbol' placeholder='Token symbol' />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    className='resize-none'
                    id='description'
                    placeholder='Token symbol'
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='outline'>
              <Dialog>
                <DialogTrigger asChild>
                  <p>Max suply?</p>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Max suply</DialogTitle>
                    <DialogDescription>
                      Make a limit of how many tokens can be minted for this
                      collection.
                    </DialogDescription>
                  </DialogHeader>
                  <form className='py-4'>
                    <div className='flex flex-col justify-center items-start gap-4'>
                      <Label htmlFor='supply' className='text-right'>
                        Amount
                      </Label>
                      <Input
                        id='supply'
                        type='number'
                        placeholder='How many tokens can be minted for this collection?'
                        className='col-span-3'
                      />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button type='submit'>Save!</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Button>
            <Button>Create</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

export default App
