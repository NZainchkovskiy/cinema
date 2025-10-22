import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ShowtimeList from './ShowtimeList'
import type { Hall, ShowtimeWithMovie } from '@/types'
import { Building, Users } from 'lucide-react'

interface HallScheduleProps {
  hall: Hall
  showtimes: ShowtimeWithMovie[]
}

const HallSchedule = ({ hall, showtimes }: HallScheduleProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Building className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="text-2xl">{hall.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Users className="h-4 w-4" />
                <span>{hall.capacity} seats</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {hall.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hall.features.map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Schedule</h2>
        <ShowtimeList showtimes={showtimes} groupByDate={true} />
      </div>
    </div>
  )
}

export default HallSchedule
