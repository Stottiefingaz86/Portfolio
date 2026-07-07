'use client';

import { Play } from 'lucide-react';
import { useState } from 'react';

import type { CaseStudy, CaseStudyVideo } from '@/lib/portfolio-data';

function VideoFrame({ video, index }: { video: CaseStudyVideo; index: number }) {
  const [playing, setPlaying] = useState(false);
  const poster = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <figure className="case-video">
      <div className="case-video__frame">
        {playing ? (
          <iframe
            className="case-video__embed"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            className="case-video__trigger"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${video.title}`}
          >
            <span
              className="case-video__poster"
              style={{ backgroundImage: `url(${poster})` }}
              aria-hidden
            />
            <span className="case-video__shade" aria-hidden />
            <span className="case-video__index" aria-hidden>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="case-video__play" aria-hidden>
              <Play />
            </span>
          </button>
        )}
      </div>
      {video.caption || video.title ? (
        <figcaption className="case-video__caption">{video.caption ?? video.title}</figcaption>
      ) : null}
    </figure>
  );
}

export function CaseStudyVideos({ study }: { study: CaseStudy }) {
  const videos = study.videos ?? [];
  if (!videos.length) return null;

  return (
    <div className="case-videos" aria-label={`${study.title} videos`}>
      <p className="case-figures__label">Watch</p>
      <div className="case-videos__stack">
        {videos.map((video, index) => (
          <VideoFrame key={video.youtubeId} video={video} index={index} />
        ))}
      </div>
    </div>
  );
}
