import { mount, VueWrapper } from '@vue/test-utils'
import Auth from '@/views/Auth.vue'

describe('Auth.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(Auth)
  })

  it('Should render authentication page', () => {
    expect(wrapper.isVisible()).toBe(true)
  })
})
