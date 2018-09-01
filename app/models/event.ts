
import Model from './_model'
import { rrulestr, RRuleSet } from 'rrule';

export default class Event extends Model {
  static endpoint = 'events'

  constructor(attributes?: any) {
    super(attributes)

    if (this.attributes) {
      this.attributes.starts_at = new Date(this.attributes.starts_at)
      this.attributes.date = new Date(this.attributes.date)

      if (this.attributes.recurrence_rule && typeof this.attributes.recurrence_rule === 'string') {
        this.attributes.recurrence_rule = rrulestr(this.attributes.recurrence_rule, {forceset: true})
        this.attributes.recurrence_rule.exdate(new Date(this.attributes.starts_at))
      }
    }
  }
}