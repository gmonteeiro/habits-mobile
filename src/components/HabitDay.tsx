import clsx from "clsx";
import dayjs from "dayjs";
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { generateProgressPercentage } from "../utils/generate-progress-percentage";

const WEEK_DAYS = 7;
const SCREEN_HORIZINTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGING_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZINTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
}

export function HabitDay({
  amountOfHabits = 0,
  amountCompleted = 0,
  date,
  ...rest
}: Props) {
  const amountAccomplishedPewrcentage =
    amountOfHabits > 0
      ? generateProgressPercentage(amountOfHabits, amountCompleted)
      : 0;

  const today = dayjs().startOf("day").toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        ["bg-zinc-900 border-zinc-800"]: amountAccomplishedPewrcentage === 0,
        ["bg-violet-900 border-violet-700"]:
          amountAccomplishedPewrcentage > 0 &&
          amountAccomplishedPewrcentage <= 20,
        ["bg-violet-800 border-violet-600"]:
          amountAccomplishedPewrcentage > 20 &&
          amountAccomplishedPewrcentage <= 40,
        ["bg-violet-700 border-violet-500"]:
          amountAccomplishedPewrcentage > 40 &&
          amountAccomplishedPewrcentage <= 60,
        ["bg-violet-600 border-violet-500"]:
          amountAccomplishedPewrcentage > 60 &&
          amountAccomplishedPewrcentage <= 80,
        ["bg-violet-500 border-violet-400"]: amountAccomplishedPewrcentage > 80,
        ["border-white border-2"]: isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  );
}
