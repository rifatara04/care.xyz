"use client";

import { postBooking } from "@/app/actions/server/booking";
import { largeBtnPrimary } from "@/utils/classNames";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import AuthSpinnerLoader from "../loaders/AuthSpinner";

export default function BookingForm({ user, service, locations = [] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cost, setCost] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const divisions = [...new Set(locations.map((l) => l.region))];
  const watchDivision = useWatch({ name: "division", control });
  const watchDistrict = useWatch({ name: "district", control });
  const watchDuration = useWatch({ name: "duration", control });

  const getDistricts = (div) => {
    return locations.filter((l) => l.region === div).map((d) => d.district);
  };
  useEffect(() => {
    if (!service?.pricePerDay) return;

    const duration = Number(watchDuration) || 0;
    const extraCharge = watchDistrict && watchDistrict !== "Dhaka" ? 250 : 0;
    const total = duration * service?.pricePerDay + duration * extraCharge;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCost(total || service?.pricePerDay + extraCharge);
  }, [service, watchDuration, watchDistrict]);

  const handleBooking = async (data) => {
    setIsLoading(true);
    const newBooking = {
      ...data,
      serviceId: service?.id,
      serviceName: service?.title,
      totalCost: cost,
      buyerName: user?.name,
      buyerEmail: user?.email,
    };
    const res = await postBooking(newBooking);
    if (res.success) {
      toast.success(res.message);
      reset();
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  };
  return (
    <form
      className="max-w-2xl mx-auto fieldset"
      onSubmit={handleSubmit(handleBooking)}
    >
      <div className="flex gap-4 mb-2">
        <div className="flex-1">
          <label className="label">User Name</label>
          <input
            type="text"
            disabled
            className="input w-full"
            value={user?.name}
          />
        </div>
        <div className="flex-1">
          <label className="label">User Email</label>
          <input
            type="email"
            disabled
            className="input w-full"
            value={user?.email}
          />
        </div>
      </div>
      <div className="flex gap-4 mb-2">
        <div className="flex-1">
          <label className="label">Duration</label>
          <input
            disabled={isLoading}
            type="number"
            className="input w-full"
            placeholder="eg: 7 for 1 week"
            {...register("duration", {
              valueAsNumber: true,
              required: "Duration is required",
              min: {
                value: 1,
                message: "Booking not allowed for less than 1 day!",
              },
              max: {
                value: 30,
                message:
                  "Maximum allowed for 1 month! For Monthly plan contact support",
              },
            })}
          />
          {errors.duration && (
            <p className="text-error">{errors.duration.message}</p>
          )}
        </div>
        <div className="flex-1">
          <label className="label">Total Cost (in BDT)*</label>
          <input
            type="number"
            disabled
            value={cost || service?.pricePerDay}
            className="input w-full disabled:text-primary disabled:font-bold"
            placeholder="Total Price"
            {...register("totalCost")}
          />
        </div>
      </div>
      <div className="flex gap-4 mb-2">
        <div className="flex-1">
          <label className="label">Select Division</label>
          <select
            disabled={isLoading}
            className="select"
            {...register("division", { required: "Division is required" })}
          >
            <option value="" className="text-neutral/45">
              Select a division
            </option>
            {divisions.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.division && (
            <p className="text-error">{errors.division.message}</p>
          )}
        </div>
        <div className="flex-1">
          <label className="label">Select District</label>
          <select
            disabled={isLoading}
            className="select"
            {...register("district", { required: "District is required" })}
          >
            <option value="" className="text-neutral/45">
              Select a district
            </option>
            {getDistricts(watchDivision).map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-error">{errors.district.message}</p>
          )}
        </div>
      </div>
      <p className="text-primary">
        * Outside Dhaka 250BDT extra charge will be applied per day
      </p>
      <button
        disabled={isLoading}
        className={`${largeBtnPrimary} mx-auto w-max mt-6`}
      >
        {isLoading && <AuthSpinnerLoader />}
        {isLoading ? "Booking" : "Book Now"}
      </button>
    </form>
  );
}
