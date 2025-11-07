import { Clock, Calendar, MapPin } from 'lucide-react';

interface ShowtimeInfoProps {
  movieTitle: string;
  moviePoster: string;
  cinemaName: string;
  roomName: string;
  startTime: string;
  date: string;
}

const ShowtimeInfo = ({
  movieTitle,
  moviePoster,
  cinemaName,
  roomName,
  startTime,
  date
}: ShowtimeInfoProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="flex gap-4">
        <img 
          src={moviePoster} 
          alt={movieTitle}
          className="w-16 h-24 sm:w-20 sm:h-30 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 truncate">
            {movieTitle}
          </h2>
          <div className="space-y-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{cinemaName} - {roomName}</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{startTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowtimeInfo;