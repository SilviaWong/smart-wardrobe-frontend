import axios from 'axios'
import type { Clothing } from '../types'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  timeout: 10000
})

async function fetchClothing(): Promise<Clothing[]> {
  const { data } = await client.get<Clothing[]>('/clothing')
  return data
}

async function createClothing(payload: Omit<Clothing, 'id' | 'createTime'>): Promise<Clothing> {
  const { data } = await client.post<Clothing>('/clothing', payload)
  return data
}

async function updateClothing(id: number, payload: Partial<Clothing>): Promise<Clothing> {
  const { data } = await client.put<Clothing>(`/clothing/${id}`, payload)
  return data
}

async function deleteClothing(id: number): Promise<void> {
  await client.delete(`/clothing/${id}`)
}

export const wardrobeApi = {
  fetchClothing,
  createClothing,
  updateClothing,
  deleteClothing
}
