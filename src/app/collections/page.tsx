'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Collection } from '@/types/collections.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import Image from 'next/image'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { RiImageAddLine } from 'react-icons/ri'
import { useToast } from '@/components/ui/use-toast'

enum State {
  LOADING,
  ERROR,
  SUCCESS
}

function Page () {
  const [data, setData] = useState<Collection[] | null>(null)
  const [state, setState] = useState<State>(State.LOADING)
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(
    null
  )
  async function getCollections () {
    try {
      const response = await axios.get('/api/getCollections')
      const { CATS } = response.data
      setState(State.SUCCESS)
      setData(CATS)
    } catch (e) {
      console.error(e)
      setState(State.ERROR)
    }
  }

  useEffect(() => {
    getCollections()
  }, [])

  const [isDragging, setIsDragging] = useState<boolean>(false)

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    console.debug('Drag over')
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }
  const [file, setFile] = useState<FileList | null>(null)

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    setFile(files)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files)
  }

  return (
    <main className='flex justify-center flex-col gap-5 items-center min-h-screen'>
      {state === State.LOADING && <p>Loading...</p>}
      {state === State.ERROR && <p>Something went wrong</p>}
      {state === State.SUCCESS && data && (
        <div className='grid w-full h-[60vh] px-10 collectionsPage gap-5'>
          <Card>
            <CardHeader>
              <CardTitle>Collections</CardTitle>
            </CardHeader>
            <CardContent className='flex max-h-full overflow-scroll flex-col gap-2'>
              {data.map((collection, index) => (
                <Button
                  onClick={() => setCurrentCollection(collection)}
                  className='flex flex-col gap-2 justify-center items-start h-auto w-full'
                  key={index}
                  variant={'outline'}
                >
                  {/* <Image className='rounded-md' src={collection.image} height={64} width={64} alt='Collection image' /> */}
                  <h1 className='font-bold text-2xl'>{collection.name}</h1>
                  <p className='font-light'>{collection.description}</p>
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card className='p-10'>
            {!currentCollection && (
              <CardHeader>
                <CardTitle>Select a collection</CardTitle>
              </CardHeader>
            )}
            {currentCollection && (
              <CardContent className='collectionPanel  gap-5   max-h-full w-full'>
                <Image
                  width={300}
                  height={200}
                  className='rounded-md h-full w-full'
                  src={currentCollection.image}
                  sizes='(max-width: 768px) 100%, (max-width: 1200px)  100%'
                  alt='Collection image'
                />
                <Card>
                  <CardHeader>
                    <CardTitle>{currentCollection?.name} </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{currentCollection.description}</p>
                  </CardContent>
                </Card>
                <div className='flex flex-row justify-between gap-4 col-span-2 '>
                  <div className='flex flex-col justify-center items-center p-1 w-full rounded-full text-center shadow-md'>
                    <h3 className='font-bold'>Symbol</h3>
                    <p>{currentCollection.symbol}</p>
                  </div>
                  <div className='flex flex-col justify-center items-center p-1 w-full rounded-full text-center shadow-md'>
                    <h3 className='font-bold'>Suply</h3>
                    <p>{currentCollection.maxSuply}</p>
                  </div>
                  <div className='flex flex-col justify-center items-center p-1 w-full rounded-full text-center shadow-md'>
                    <h3 className='font-bold'>Expendance</h3>
                    <p>12</p>
                  </div>
                </div>
                <Button className='col-span-2 w-full'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <p> Create Sub-Collection</p>
                    </DialogTrigger>
                    <DialogContent >
                      <DialogHeader>
                        <DialogTitle className='font-bold text-2xl text-center'>
                          Drag and drop files
                        </DialogTitle>
                      </DialogHeader>
                      <label
                        className={`w-full h-full rounded-md text-slate-400 text-center flex justify-cente p-10 items-center transition-all ease-in-out cursor-pointer hover:border-green-400 hover:text-green-400 flex-col gap-5 ${
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
                      <input
                        onChange={handleFileChange}
                        type='file'
                        placeholder='something'
                        name='imageATT'
                        id='imageATT'
                        className='hidden'
                      />
                      <DialogFooter>
                        <Button className='w-full' type='submit'>Save!</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Button>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </main>
  )
}

export default Page
