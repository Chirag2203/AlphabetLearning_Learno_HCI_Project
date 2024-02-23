
import { MaskContainer } from "./ui/svg-mask-effect";

export function About() {
  return (
    <div className="h-[40rem] flex items-center justify-center  overflow-hidden ">
      <MaskContainer
        revealText={
          <p className="  text-slate-800 text-center  text-4xl font-bold">
            {/* write about us we are edtech company which help children learn */}
            We are the best in the business of teaching your child! We use AI to help your child learn better. We have a parent console where you can moniter all the child stats


            
          </p>
        }
        className="h-[40rem]  "
      >
                    We are the <span className="text-red-500">best</span> in the business of teaching your child! We use <span className="text-red-500">AI</span> to help your child learn better. We have a <span className="text-red-500">parent console</span> where you can moniter all the child stats

      </MaskContainer>
    </div>
  );
}
