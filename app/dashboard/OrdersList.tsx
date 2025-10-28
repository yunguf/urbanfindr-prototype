import { createClient } from '@/lib/supabase/server'
import AddOrderForm from './AddOrderForm'
import DeleteOrderButton from './DeleteOrderButton'

export default async function OrdersList() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Add New Order</h3>
          <div className="mt-4">
            <AddOrderForm />
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Your Orders</h3>
          {!orders || orders.length === 0 ? (
            <p className="text-sm text-gray-500">No orders yet. Create your first order above!</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{order.customer_name}</h4>
                      <p className="mt-1 text-sm text-gray-600">{order.description}</p>
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                        <span className="font-medium">${order.amount}</span>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {order.status}
                        </span>
                        <span>{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <DeleteOrderButton orderId={order.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
