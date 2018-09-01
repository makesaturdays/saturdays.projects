import { Request } from 'express'
import { ObjectID } from 'mongodb'
import { RRule, RRuleSet, rrulestr } from 'rrule'

import { ResponseError } from '../helpers/errors'
import { EMAIL, PASSWORD, TEXT, OBJECT_ID, ARRAY, DATE, FLOAT, OPTIONAL, INT, ONEOF } from '../helpers/properties'

import Model from './_model'


export default class Event extends Model {
  static collection = 'events'
  static properties = {
    name: TEXT,
    description: OPTIONAL(TEXT),
    starts_at: DATE,
    length_in_hours: FLOAT(0, 12),
    project_id: OPTIONAL(OBJECT_ID),
    location_id: OPTIONAL(OBJECT_ID),
    recurring: {
      type: 'object',
      required: false,
      properties: {
        frequency: ONEOF(TEXT, ['daily', 'weekly', 'monthly']),
        interval: INT(1),
        count: OPTIONAL(INT(1)),
        until: OPTIONAL(DATE),
        weekday: ARRAY(INT(0))
      }
    }
  }

  static postprocess(data: any) {
    let date = new Date(data.starts_at)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return super.postprocess({
      ...data,
      date,
      ...(data.recurring ? {
        recurrence_rule: new RRule({
          dtstart: data.starts_at,
          freq: ({
            'monthly': RRule.MONTHLY,
            'weekly': RRule.WEEKLY,
            'daily': RRule.DAILY
          } as any)[data.recurring.frequency],
          interval: data.recurring.interval,
          count: data.recurring.count,
          until: data.recurring.until,
          byweekday: data.recurring.weekday
        }).toString()
      } : {})
    })
  }
}