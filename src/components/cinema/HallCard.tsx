import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Hall } from '@/types'
import { Building, Users } from 'lucide-react'

interface HallCardProps {
  hall: Hall
}

const HallCard = ({ hall }: HallCardProps) => {
  return (
    <Link
      to="/halls/$hallId"
      params={{ hallId: hall.id }}
      className="block group"
    >
      <Card className="hover:shadow-lg transition-all duration-300 h-full group-hover:scale-[1.02]">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Building className="h-6 w-6" />
            <CardTitle className="text-xl">{hall.name}</CardTitle>
          </div>
          <CardDescription className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="font-medium">{hall.capacity} seats</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hall.features.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {hall.features.map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Standard screening</p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export default HallCard
