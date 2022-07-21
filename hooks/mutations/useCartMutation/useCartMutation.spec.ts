import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { useCartMutation } from './useCartMutation'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

import type { CartItemInput } from '@/lib/gql/types'

const productInput = {
  options: [
    {
      attributeFQN: 'tenant~brand-colors',
      value: 'Pine-Green',
      shopperEnteredValue: null,
    },
    {
      attributeFQN: 'tenant~size',
      value: 'L/XL',
      shopperEnteredValue: null,
    },
  ],
  productCode: 'MS-BTL-002',
  variationProductCode: 'MS-BTL-002-8',
}

describe('[hooks] useCartMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should use useCartMutation when addToCart', () => {
    renderHook(
      async () => {
        const { addToCart } = useCartMutation()
        const addResponse = await addToCart.mutateAsync({
          product: productInput,
          quantity: 6,
        })

        expect(addResponse).toStrictEqual(cartItemMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })

  it('should use useCartMutation for updateCartItem', async () => {
    renderHook(
      async () => {
        const { updateCartItem } = useCartMutation()

        const updateResponse = await updateCartItem.mutateAsync({
          cartItemId: '1beef214158842d7a305ae68009d4d4c',
          cartItemInput: cartItemMock as CartItemInput,
        })

        await waitFor(() => expect(updateResponse).toStrictEqual(cartItemMock))
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })

  it('should use useCartMutation when updateCartItemQuantity', async () => {
    renderHook(
      async () => {
        const { updateCartItemQuantity } = useCartMutation()
        const response = await updateCartItemQuantity.mutateAsync({
          cartItemId: 'fjsdhfjsdh53472bkjsdffdf',
          quantity: 2,
        })
        expect(response).toStrictEqual(cartItemMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })

  it('should use useCartMutation when removeCartItem', async () => {
    renderHook(
      async () => {
        const { removeCartItem } = useCartMutation()
        const response = await removeCartItem.mutateAsync({
          cartItemId: 'fjsdhfjsdh53472bkjsdffdf',
        })
        expect(response).toEqual(true)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
