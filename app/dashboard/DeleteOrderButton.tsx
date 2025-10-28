'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteOrderButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this order?')) return

    setLoading(true)
    try {
      const { error } = await supabase.from('orders').delete().eq('id', orderId)

      if (error) throw error

      router.refresh()
    } catch (error: any) {
      alert('Error deleting order: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-800 text-sm font-medium disabled:text-red-300"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}
