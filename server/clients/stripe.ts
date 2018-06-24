
import stripe from 'stripe'
import { CONF } from '../../config'

export default stripe(CONF('STRIPE_SECRET_KEY'))