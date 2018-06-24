
import * as cookies from 'browser-cookies'

import Model from './_model'

export default class Session extends Model {
  static endpoint = 'sessions'

  public save(data: any) {
    return super.save(data).then(session => {
      if (!this.error) {
        cookies.set('Session-Id', this.attributes._id)
        cookies.set('Session-Secret', this.attributes.secret)
        cookies.set('User-Id', this.attributes.user_id)
      }

      return session
    })
  }

  public destroy() {
    cookies.erase('Session-Id')
    cookies.erase('Session-Secret')
    cookies.erase('User-Id')
    return super.destroy()
  }
}