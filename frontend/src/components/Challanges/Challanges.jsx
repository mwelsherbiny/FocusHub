import "./Challanges.css";
import { useContext, useRef, useState } from "react";
import refreshIcon from "../../assets/refresh-icon.svg";
import { WidgetContext } from "../../contexts";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

const challenges = [
  {
    id: 1,
    challenge: "Work in 25-minute Pomodoro sessions with 5-minute breaks.",
  },
  { id: 2, challenge: "Plan your entire day using time blocking." },
  {
    id: 3,
    challenge: "Eliminate one major distraction from your workspace.",
  },
  {
    id: 4,
    challenge:
      "Wake up 30 minutes earlier and start your day with a priority task.",
  },
  {
    id: 5,
    challenge: "Write down your top 3 tasks for tomorrow before bed.",
  },
  {
    id: 6,
    challenge:
      "Follow the 2-minute rule: If a task takes less than 2 minutes, do it now.",
  },
  {
    id: 7,
    challenge:
      "Turn off all social media notifications for a full work session.",
  },
  {
    id: 8,
    challenge:
      "Try the Eisenhower Matrix to prioritize tasks (urgent/important).",
  },
  { id: 9, challenge: "Declutter and organize your workspace." },
  {
    id: 10,
    challenge: "Spend 10 minutes journaling your biggest distractions today.",
  },
  {
    id: 11,
    challenge: "Use a productivity app to track your tasks for the day.",
  },
  {
    id: 12,
    challenge: "Limit social media use to a maximum of 30 minutes today.",
  },
  {
    id: 13,
    challenge:
      "Spend the first hour of your day working without checking emails or messages.",
  },
  {
    id: 14,
    challenge: "Try single-tasking instead of multitasking for the entire day.",
  },
  {
    id: 15,
    challenge: "Read for at least 20 minutes on a topic related to your goals.",
  },
  { id: 16, challenge: "Try a digital detox for at least 3 hours today." },
  {
    id: 17,
    challenge: "Batch similar tasks together to increase efficiency.",
  },
  {
    id: 18,
    challenge: "Take a 5-minute standing or stretching break every hour.",
  },
  {
    id: 19,
    challenge: "Drink at least 2 liters of water to stay hydrated and focused.",
  },
  {
    id: 20,
    challenge: "Go for a short 10-minute walk to refresh your mind.",
  },
  { id: 21, challenge: "Finish one task you've been procrastinating on." },
  { id: 22, challenge: "Create a ‘Done’ list instead of just a to-do list." },
  {
    id: 23,
    challenge: "Spend 30 minutes on deep work without any distractions.",
  },
  {
    id: 24,
    challenge:
      "Try working in a different environment for a productivity boost.",
  },
  { id: 25, challenge: "Delete one app from your phone that wastes time." },
  { id: 26, challenge: "Limit checking emails to twice a day." },
  { id: 27, challenge: "Unsubscribe from 5 unnecessary email newsletters." },
  {
    id: 28,
    challenge: "Try working with background instrumental music for focus.",
  },
  { id: 29, challenge: "Automate a repetitive task using a script or tool." },
  {
    id: 30,
    challenge: "Use a habit tracker to track your progress on key habits.",
  },
  {
    id: 31,
    challenge: "Say no to one unnecessary task or commitment today.",
  },
  {
    id: 32,
    challenge: "Try the 5-4-3-2-1 rule to start tasks you've been avoiding.",
  },
  {
    id: 33,
    challenge: "Set a strict bedtime and wake-up time for better productivity.",
  },
  {
    id: 34,
    challenge:
      "Reflect on your most productive time of day and schedule tasks accordingly.",
  },
  {
    id: 35,
    challenge: "Complete one small personal development task today.",
  },
  {
    id: 36,
    challenge: "Limit meetings to a maximum of 30 minutes if possible.",
  },
  {
    id: 37,
    challenge:
      "Write a short journal entry on what worked and what didn’t today.",
  },
  {
    id: 38,
    challenge: "Use sticky notes or digital reminders for key tasks.",
  },
  {
    id: 39,
    challenge: "Reward yourself after completing a major task today.",
  },
  { id: 40, challenge: "Create a dedicated focus playlist for deep work." },
  {
    id: 41,
    challenge:
      "Set a clear goal for today and measure your progress at the end.",
  },
  {
    id: 42,
    challenge:
      "Use the 80/20 rule: Identify the 20% of tasks that give 80% results.",
  },
  {
    id: 43,
    challenge: "Challenge yourself to finish a task faster than usual.",
  },
  {
    id: 44,
    challenge: "Block time for learning a new skill for 30 minutes today.",
  },
  {
    id: 45,
    challenge: "Delete or archive unnecessary files cluttering your workspace.",
  },
  { id: 46, challenge: "Write a short gratitude list to boost positivity." },
  {
    id: 47,
    challenge: "Try working offline for an hour to minimize distractions.",
  },
  {
    id: 48,
    challenge: "Use color-coded labels to organize your tasks better.",
  },
  { id: 49, challenge: "Spend 10 minutes planning your week ahead." },
  {
    id: 50,
    challenge: "Track your screen time and reduce unnecessary usage.",
  },
  {
    id: 51,
    challenge: "Create a morning routine that sets a productive tone.",
  },
  {
    id: 52,
    challenge: "Write down three things that inspire you to stay motivated.",
  },
  { id: 53, challenge: "Use an accountability partner to stay on track." },
  {
    id: 54,
    challenge: "Work in a distraction-free zone for at least 2 hours today.",
  },
  {
    id: 55,
    challenge: "Use the 1-3-5 rule: 1 big task, 3 medium tasks, 5 small tasks.",
  },
  {
    id: 56,
    challenge: "Limit your caffeine intake and replace it with water.",
  },
  {
    id: 57,
    challenge: "Review your long-term goals and adjust them if needed.",
  },
  { id: 58, challenge: "Create a vision board for motivation." },
  { id: 59, challenge: "Take a power nap to restore focus." },
  {
    id: 60,
    challenge: "Identify and remove one bad habit affecting productivity.",
  },
  { id: 61, challenge: "Try voice typing to speed up writing tasks." },
  { id: 62, challenge: "Delegate a non-essential task to free up time." },
  {
    id: 63,
    challenge:
      "Make a list of your top distractions and find ways to reduce them.",
  },
  { id: 64, challenge: "Commit to a 12-hour no-social-media challenge." },
  {
    id: 65,
    challenge: "Break a complex task into smaller, actionable steps.",
  },
  {
    id: 66,
    challenge: "Use mind mapping to brainstorm ideas for a project.",
  },
  {
    id: 67,
    challenge: "Follow the ‘Eat the Frog’ method: Do the hardest task first.",
  },
  {
    id: 68,
    challenge: "Create a ‘Not-To-Do’ list to avoid time-wasting activities.",
  },
  {
    id: 69,
    challenge: "Try handwriting notes instead of typing for better retention.",
  },
  { id: 70, challenge: "Use flashcards to quickly review key information." },
  { id: 71, challenge: "Schedule breaks before you start your workday." },
  { id: 72, challenge: "Set a goal to read one book per month." },
  {
    id: 73,
    challenge:
      "Eliminate one unhealthy snack and replace it with a healthy one.",
  },
  {
    id: 74,
    challenge: "Try a new meditation or breathing exercise to boost focus.",
  },
  {
    id: 75,
    challenge: "Make a playlist of motivational speeches to stay inspired.",
  },
];

export default function Challanges({ visible, draggable }) {
  const { positions, setPositions } = useContext(WidgetContext);
  const nodeRef = useRef(null);

  function updatePosition(event, data) {
    const newPositions = { ...positions, challanges: { x: data.x, y: data.y } };
    setPositions(newPositions);
    localStorage.setItem("positions", JSON.stringify(newPositions));
  }
  const [currentChallange, setCurrentChallange] = useState(
    challenges[Math.floor(Math.random() * challenges.length)]
  );

  return (
    <Draggable
      disabled={!draggable}
      position={positions.challanges}
      onDrag={updatePosition}
      nodeRef={nodeRef}
    >
      <div
        className="challanges"
        style={{ display: visible ? "" : "none" }}
        ref={nodeRef}
      >
        <button
          onClick={() => {
            let newChallenge;
            do {
              newChallenge =
                challenges[Math.floor(Math.random() * challenges.length)];
            } while (newChallenge.id === currentChallange.id);

            setCurrentChallange(newChallenge);
          }}
        >
          <img src={refreshIcon} alt="Refresh challange" />
        </button>
        <p>{currentChallange.challenge}</p>
      </div>
    </Draggable>
  );
}

Challanges.propTypes = {
  visible: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
};
