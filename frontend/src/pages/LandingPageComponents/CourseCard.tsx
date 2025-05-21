import React, { useEffect, useState } from 'react';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

/**
 * Props for the CourseCard component.
 * @interface CourseCardProps
 * @property {string} title - The title of the course.
 * @property {string} description - A brief description of the course.
 * @property {string} imageSrc - The source URL for the course image.
 * @property {string} courseId - The ID of the course.
 * @property {string} firebaseUid - The Firebase user ID.
 * @property {number} totalSteps - The total number of steps in the course.
 */
interface CourseCardProps {
  title: string;
  description: string;
  imageSrc: string;
  courseId: string;
  firebaseUid: string;
  totalSteps: number;
}

/**
 * CourseCard component displays information about a course.
 * 
 * @param {CourseCardProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered CourseCard component.
 */
export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  imageSrc,
  courseId,
  firebaseUid,
  totalSteps
}) => {
  const [progress, setProgress] = useState<number | null>(null);

  // Fetches progress for the course
  const fetchProgress = async () => {
    try {
      console.log(`Fetching progress for courseId: ${courseId} with UID: ${firebaseUid}`);
      if (!firebaseUid) return; // prevent invalid request
      const response = await axios.get(`${backendUrl}/course_progress/${firebaseUid}`);
      console.log("Raw response data for", courseId, ":", response.data);
      const data = response.data;
      if (!data || typeof data !== 'object') {
        setProgress(0);
        return;
      }
      const completed = data[courseId] ?? 0;
      setProgress(completed);
      console.log(`Course ID: ${courseId}, Completed tasks: ${completed}`);
      // Previous logic using is_correct:
      // if (data) {
      //   setProgress(data.correct);
      //   setTotalSteps(data.total);
      // }
    } catch (error) {
      console.error("Failed to fetch course progress", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!firebaseUid) return;
        await fetchProgress();
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchData();
  }, [firebaseUid, courseId]);

  return (
    <article className="flex flex-col max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden flex-col py-5 mx-auto w-full rounded-3xl border border-solid bg-zinc-900 border-zinc-900 max-md:mt-4 max-md:max-w-full">
        <div className="flex z-10 flex-col px-3.5 w-full max-md:pr-5 max-md:max-w-full">
          <div className="max-md:mr-2.5 max-md:max-w-full">
            <div className="grid grid-cols-2">
              <div className="pl-2">
                <img loading="lazy" src={imageSrc} alt={`${title} course illustration`} className="rounded-3xl" />
              </div>
              <div className="flex flex-col ml-5 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col mt-2 max-md:mt-10">
                  <div className="flex flex-col min-h-[14px]">
                    <div className="flex w-full bg-purple-200 rounded-lg min-h-[4px]">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg"
                        style={{ width: progress !== null ? `${(progress / totalSteps) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-xs tracking-normal leading-tight text-white font-[number:var(--sds-typography-subheading-font-weight)]">
                    {progress !== null
                      ? `Progress ${progress}/${totalSteps}`
                      : 'Loading progress...'}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2">
              <h2 className="text-left mt-3.5 text-5xl tracking-tighter leading-tight text-white font-[number:var(--sds-typography-heading-font-weight)] max-md:max-w-full max-md:text-4xl">
                {title}
              </h2>
              <p className="text-left overflow-hidden flex-1 shrink pt-3 pb-14 text-xl tracking-tight leading-tight text-white rounded-lg border border-solid bg-white bg-opacity-0 border-zinc-300 border-opacity-0 font-[number:var(--sds-typography-subheading-font-weight)] min-h-[93px] min-w-[240px] max-md:max-w-full">
                {description}
              </p>
            </div>
          </div>
          <button className="flex gap-1 justify-center items-center self-center px-2.5 py-2 max-w-full text-base tracking-tight leading-none text-white bg-red-400 min-h-[33px] rounded-[40px] w-[307px]">
            <span className="self-stretch my-auto text-center">􀊄</span>
            <span className="self-stretch my-auto">View Course</span>
          </button>
        </div>
      </div>
    </article>
  );
};
