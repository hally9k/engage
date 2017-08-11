import dayDiff from 'date-fns/difference_in_days'
import hourDiff from 'date-fns/difference_in_hours'
import minDiff from 'date-fns/difference_in_minutes'
import monthDiff from 'date-fns/difference_in_months'
import secDiff from 'date-fns/difference_in_seconds'
import subDays from 'date-fns/sub_days'
import subHours from 'date-fns/sub_hours'
import subMinutes from 'date-fns/sub_minutes'
import subMonths from 'date-fns/sub_months'
import subSeconds from 'date-fns/sub_seconds'
import subWeeks from 'date-fns/sub_weeks'
import subYears from 'date-fns/sub_years'
import weekDiff from 'date-fns/difference_in_weeks'
import yearDiff from 'date-fns/difference_in_years'
import formatDate from 'date-fns/format'

export function ago(timestamp) {
    const diff = accurateDiff(timestamp)

    if (diff.span === 'seconds' || diff.span === null) {
        return 'just now'
    }
    if (diff.span === 'minutes') {
        return `${diff.minutes} ${pluralise(
            'min',
            diff.minutes > 1 || diff.minutes === 0,
        )} ago`
    }
    if (diff.span === 'hours') {
        return `${diff.hours} ${pluralise(
            'hr',
            diff.hours > 1 || diff.hours === 0,
        )}${diff.minutes > 0
            ? `, ${diff.minutes} ${pluralise(
                'min',
                diff.minutes > 1 || diff.minutes === 0,
            )}`
            : ''} ago`
    }
    if (diff.span === 'days' && diff.days < 2) {
        return format(timestamp, 'ye\\ster\\d\\ay \\at HH:mma')
    }
    if (
        (diff.span === 'days' && diff.days >= 2) ||
        ['weeks', 'months'].includes(diff.span)
    ) {
        return format(timestamp, 'dddd D of MMMM \\at HH:mma')
    }

    return format(timestamp, 'D MMMM YYYY')
}

export function accurateDiff(timestamp) {
    const difference = Date.now() - timestamp < 0 ? 1 : -1

    const now = Date.now()
    const then = new Date(timestamp).getTime()
    const nowDate = new Date(now)
    let remainder,
        thenDate = new Date(then)

    const values = {
        difference,
        span: null,
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    }

    values.years = Math.round(Math.abs(yearDiff(nowDate, thenDate)))
    values.span = !values.span && values.years > 0 ? 'years' : values.span
    remainder = subYears(thenDate, values.years * difference)

    values.months = Math.round(Math.abs(monthDiff(nowDate, remainder)))
    values.span = !values.span && values.months > 0 ? 'months' : values.span
    remainder = subMonths(remainder, values.months * difference)

    values.weeks = Math.round(Math.abs(weekDiff(nowDate, remainder)))
    values.span = !values.span && values.weeks > 0 ? 'weeks' : values.span
    remainder = subWeeks(remainder, values.weeks * difference)

    values.days = Math.round(Math.abs(dayDiff(nowDate, remainder)))
    values.span = !values.span && values.days > 0 ? 'days' : values.span
    remainder = subDays(remainder, values.days * difference)

    values.hours = Math.round(Math.abs(hourDiff(nowDate, remainder)))
    values.span = !values.span && values.hours > 0 ? 'hours' : values.span
    remainder = subHours(remainder, values.hours * difference)

    values.minutes = Math.round(Math.abs(minDiff(nowDate, remainder)))
    values.span = !values.span && values.minutes > 0 ? 'minutes' : values.span
    remainder = subMinutes(remainder, values.minutes * difference)

    values.seconds = Math.round(Math.abs(secDiff(nowDate, remainder)))
    values.span = !values.span && values.seconds > 0 ? 'seconds' : values.span
    remainder = subSeconds(remainder, values.seconds * difference)

    return values
}

export function format(timestamp, format) {
    if (!format) return formatDate(timestamp, 'MMMM D, YYYY')

    return formatDate(timestamp, format)
}

export function pluralise(string, shouldPluralise) {
    if (shouldPluralise) {
        return `${string}s`
    }

    return string
}
