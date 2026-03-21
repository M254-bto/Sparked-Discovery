"use client";

import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  parentName: string;
  phone: string;
  email: string;
  area: string;
  childName: string;
  age: string;
  school: string;
  grade: string;
  codingExp: string;
  codingOther: string;
  parentMotivation: string;
  motivationOther: string;
  longEnrollment: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const empty: FormData = {
  parentName: "",
  phone: "",
  email: "",
  area: "",
  childName: "",
  age: "",
  school: "",
  grade: "",
  codingExp: "",
  codingOther: "",
  parentMotivation: "",
  motivationOther: "",
  longEnrollment: "",
};

// ─── Shared UI primitives ─────────────────────────────────────────────────────

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-[10px] tracking-[0.14em] uppercase text-[#9B9B9B] mb-2.5 font-medium select-none">
      {children}
      {required && <span className="text-bright ml-1">*</span>}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent border-b-[1.5px] ${
          error ? "border-red-400" : "border-subtle"
        } py-3 text-[15px] text-charcoal placeholder:text-[#A8BDD6] focus:outline-none focus:border-cobalt transition-colors duration-200`}
      />
      {error && (
        <p className="text-red-400 text-[11px] mt-1.5 tracking-wide">{error}</p>
      )}
    </div>
  );
}

function SelectInput({
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`w-full bg-transparent border-b-[1.5px] ${
          error ? "border-red-400" : "border-subtle"
        } py-3 text-[15px] ${
          value ? "text-charcoal" : "text-[#A8BDD6]"
        } focus:outline-none focus:border-cobalt transition-colors duration-200 cursor-pointer pr-6`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {/* Custom arrow */}
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#A8BDD6]"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {error && (
        <p className="text-red-400 text-[11px] mt-1.5 tracking-wide">{error}</p>
      )}
    </div>
  );
}

function ChoiceCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3.5 w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 cursor-pointer ${
        selected
          ? "border-navy bg-navy text-white"
          : "border-subtle bg-surface text-[#2A3A52] hover:border-cobalt/40 hover:bg-tint"
      }`}
    >
      {/* Radio dot */}
      <div
        className={`mt-0.5 w-4 h-4 rounded-full border-[1.5px] shrink-0 flex items-center justify-center transition-all duration-200 ${
          selected ? "border-white" : "border-[#C0BCB5]"
        }`}
      >
        {selected && (
          <div className="w-1.75 h-1.75 rounded-full bg-white" />
        )}
      </div>
      <span className="text-[14px] leading-snug font-[450] pt-px">{label}</span>
    </button>
  );
}

function StepHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6 sm:mb-9">
      <h2 className="font-serif text-[22px] sm:text-[26px] text-navy font-semibold leading-tight mb-2">
        {title}
      </h2>
      <p className="text-[14px] text-[#8C8C8C] leading-relaxed">{subtitle}</p>
    </div>
  );
}

// ─── Step Components ──────────────────────────────────────────────────────────

function StepParent({
  data,
  errors,
  update,
}: {
  data: FormData;
  errors: FormErrors;
  update: (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className="step-enter">
      <StepHeading
        title="Parent Information"
        subtitle="We'll use these details to confirm your booking and keep you informed."
      />
      <div className="space-y-8">
        <div>
          <FieldLabel required>Parent / Guardian Full Name</FieldLabel>
          <TextInput
            value={data.parentName}
            onChange={update("parentName")}
            placeholder="e.g. Sarah Kamau"
            error={errors.parentName}
          />
        </div>
        <div>
          <FieldLabel required>Phone Number</FieldLabel>
          <TextInput
            type="tel"
            value={data.phone}
            onChange={update("phone")}
            placeholder="+254 7XX XXX XXX"
            error={errors.phone}
          />
        </div>
        <div>
          <FieldLabel required>Email Address</FieldLabel>
          <TextInput
            type="email"
            value={data.email}
            onChange={update("email")}
            placeholder="you@example.com"
            error={errors.email}
          />
        </div>
        <div>
          <FieldLabel>Area of Residence</FieldLabel>
          <TextInput
            value={data.area}
            onChange={update("area")}
            placeholder="e.g. Westlands, Nairobi"
          />
        </div>
      </div>
    </div>
  );
}

function StepChild({
  data,
  errors,
  update,
}: {
  data: FormData;
  errors: FormErrors;
  update: (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className="step-enter">
      <StepHeading
        title="About Your Child"
        subtitle="This helps us tailor the experience and group students appropriately."
      />
      <div className="space-y-8">
        <div>
          <FieldLabel required>Child&apos;s Full Name</FieldLabel>
          <TextInput
            value={data.childName}
            onChange={update("childName")}
            placeholder="e.g. Aiden Kamau"
            error={errors.childName}
          />
        </div>
        <div>
          <FieldLabel required>Age</FieldLabel>
          <TextInput
            type="number"
            value={data.age}
            onChange={update("age")}
            placeholder="e.g. 10"
            error={errors.age}
          />
        </div>
        <div>
          <FieldLabel>School Name</FieldLabel>
          <TextInput
            value={data.school}
            onChange={update("school")}
            placeholder="e.g. Brookhouse School"
          />
        </div>
        <div>
          <FieldLabel>Current Grade</FieldLabel>
          <TextInput
            value={data.grade}
            onChange={update("grade")}
            placeholder="e.g. Grade 5"
          />
        </div>
      </div>
    </div>
  );
}

const CODING_OPTIONS = [
  { value: "none", label: "No — this will be their first time" },
  { value: "scratch", label: "Yes — Scratch" },
  { value: "python", label: "Yes — Python" },
  { value: "other", label: "Yes — Something else" },
];

function StepExperience({
  data,
  setData,
  update,
}: {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  update: (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className="step-enter">
      <StepHeading
        title="Technology Experience"
        subtitle="No experience needed — we welcome all levels. This just helps us prepare."
      />
      <div className="space-y-3">
        {CODING_OPTIONS.map((o) => (
          <ChoiceCard
            key={o.value}
            label={o.label}
            selected={data.codingExp === o.value}
            onClick={() => setData((p) => ({ ...p, codingExp: o.value }))}
          />
        ))}
      </div>
      {data.codingExp === "other" && (
        <div className="mt-6">
          <FieldLabel>Please specify</FieldLabel>
          <TextInput
            value={data.codingOther}
            onChange={update("codingOther")}
            placeholder="e.g. HTML / JavaScript"
          />
        </div>
      )}
    </div>
  );
}

const MOTIVATION_OPTIONS = [
  { value: "confidence", label: "Building confidence with technology" },
  { value: "coding", label: "Learning coding and problem-solving" },
  { value: "future", label: "Preparing for the future digital world" },
  { value: "creativity", label: "Exploring creativity through technology" },
  { value: "other", label: "Something else" },
];

function StepGoals({
  data,
  setData,
  update,
}: {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  update: (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className="step-enter">
      <StepHeading
        title="Your Goals"
        subtitle="What excites you most about your child joining SparkEd Discovery Week?"
      />
      <div className="space-y-3">
        {MOTIVATION_OPTIONS.map((o) => (
          <ChoiceCard
            key={o.value}
            label={o.label}
            selected={data.parentMotivation === o.value}
            onClick={() =>
              setData((p) => ({ ...p, parentMotivation: o.value }))
            }
          />
        ))}
      </div>
      {data.parentMotivation === "other" && (
        <div className="mt-6">
          <FieldLabel>Tell us more</FieldLabel>
          <TextInput
            value={data.motivationOther}
            onChange={update("motivationOther")}
            placeholder="What matters most to you..."
          />
        </div>
      )}
    </div>
  );
}

const COMMITMENT_OPTIONS = [
  {
    value: "yes",
    label: "Yes, definitely — I'd love to explore that.",
  },
  {
    value: "maybe",
    label: "Possibly — I would like more information first.",
  },
  {
    value: "notsure",
    label: "Not sure yet — let's see how the week goes.",
  },
];

function StepCommitment({
  data,
  setData,
}: {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  return (
    <div className="step-enter">
      <StepHeading
        title="Looking Further Ahead"
        subtitle="If your child enjoys Discovery Week, would you be interested in SparkEd's ongoing evening or weekend learning programme?"
      />
      <div className="space-y-3">
        {COMMITMENT_OPTIONS.map((o) => (
          <ChoiceCard
            key={o.value}
            label={o.label}
            selected={data.longEnrollment === o.value}
            onClick={() =>
              setData((p) => ({ ...p, longEnrollment: o.value }))
            }
          />
        ))}
      </div>
      <div className="mt-8 p-5 rounded-xl bg-tint border border-subtle">
        <p className="text-[13px] text-muted leading-relaxed">
          <span className="text-navy font-medium">Almost there.</span> After you
          submit, our team will reach out within 24 hours to confirm your
          booking and share next steps.
        </p>
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ childName }: { childName: string }) {
  return (
    <div className="bg-surface rounded-2xl border border-subtle shadow-[0_4px_48px_rgba(10,22,40,0.07)] px-5 py-12 sm:px-8 sm:py-16 md:px-14 text-center fade-in">
      {/* Icon */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-16 h-16 rounded-full border-[1.5px] border-bright flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="text-cobalt"
          >
            <path
              d="M5 14.5l6 6L23 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 mb-6">
        <div className="h-px w-8 bg-cobalt/40" />
        <span className="text-[11px] tracking-[0.2em] uppercase text-cobalt font-semibold">
          Registration Received
        </span>
        <div className="h-px w-8 bg-cobalt/40" />
      </div>

      <h2 className="font-serif text-[28px] text-navy font-semibold leading-tight mb-4">
        {childName
          ? `${childName}'s spot is reserved.`
          : "Your spot is reserved."}
      </h2>
      <p className="text-[15px] text-[#6B6B65] leading-relaxed max-w-sm mx-auto mb-10 font-light">
        Our team will be in touch within 24 hours to confirm your booking and
        share everything you need ahead of Discovery Week.
      </p>

      <div className="border-t border-subtle pt-8 space-y-3">
        {[
          "Confirmation message via email & phone",
          "Pre-programme welcome guide",
          "Details on what to bring each day",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 justify-center text-[13px] text-muted">
            <div className="w-1 h-1 rounded-full bg-bright shrink-0" />
            {item}
          </div>
        ))}
      </div>

      <p className="mt-10 font-serif text-navy text-[16px] italic">
        We look forward to welcoming {childName || "your child"} to SparkEd.
      </p>
    </div>
  );
}

// ─── Progress indicator ───────────────────────────────────────────────────────

const STEP_LABELS = ["Parent", "Child", "Experience", "Goals", "Ahead"];

function ProgressIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-10">
      {/* Thin progress bar */}
      <div className="h-0.5 bg-subtle rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-cobalt rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, i) => {
          const idx = i + 1;
          const done = idx < step;
          const current = idx === step;
          return (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium transition-all duration-300 ${
                  done
                    ? "bg-cobalt text-white"
                    : current
                    ? "bg-navy text-white"
                    : "bg-subtle text-[#ADADAD]"
                }`}
              >
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6.5L4.5 9 10 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  idx
                )}
              </div>
              <span
                className={`text-[10px] tracking-wide hidden sm:block transition-colors duration-200 ${
                  current ? "text-navy font-medium" : "text-[#ADADAD]"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const TOTAL = 5;

  const update =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setData((p) => ({ ...p, [field]: e.target.value }));
      setErrors((p) => ({ ...p, [field]: undefined }));
    };

  const validateStep = (): boolean => {
    const e: FormErrors = {};
    if (step === 1) {
      if (!data.parentName.trim()) e.parentName = "Please enter your full name.";
      if (!data.phone.trim()) e.phone = "A phone number is required.";
      if (!data.email.trim()) {
        e.email = "Please enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        e.email = "Please enter a valid email address.";
      }
    }
    if (step === 2) {
      if (!data.childName.trim()) e.childName = "Please enter your child's name.";
      if (!data.age) e.age = "Please select your child's age.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, TOTAL));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setSubmitError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Could not connect. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <SuccessScreen childName={data.childName} />;
  }

  return (
    <div className="bg-surface rounded-2xl border border-subtle shadow-[0_4px_48px_rgba(10,22,40,0.07)] overflow-hidden">
      {/* Cobalt top accent line */}
      <div className="h-0.75 bg-linear-to-r from-navy/80 via-cobalt to-bright/70" />

      <div className="px-5 pt-8 pb-10 sm:px-8 sm:pt-10 sm:pb-12 md:px-12 md:pt-12">
        {/* Progress */}
        <ProgressIndicator step={step} total={TOTAL} />

        {/* Step content */}
        {step === 1 && (
          <StepParent data={data} errors={errors} update={update} />
        )}
        {step === 2 && (
          <StepChild data={data} errors={errors} update={update} />
        )}
        {step === 3 && (
          <StepExperience data={data} setData={setData} update={update} />
        )}
        {step === 4 && (
          <StepGoals data={data} setData={setData} update={update} />
        )}
        {step === 5 && <StepCommitment data={data} setData={setData} />}

        {/* Navigation */}
        <div className="mt-10 flex items-center gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="shrink-0 h-12 px-6 rounded-xl border border-subtle text-[14px] text-muted font-medium hover:border-cobalt/40 hover:text-navy transition-all duration-200"
            >
              Back
            </button>
          )}

          {step < TOTAL ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 h-12 bg-navy text-white rounded-xl text-[14px] font-medium tracking-wide hover:bg-cobalt active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Continue
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 h-12 bg-navy text-white rounded-xl text-[14px] font-medium tracking-wide hover:bg-cobalt active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-bright">
                    <path d="M1.5 7l4 4 7-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Reserve My Child&apos;s Spot
                </>
              )}
            </button>
          )}
        </div>

        {/* Error message */}
        {submitError && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-600 text-center leading-relaxed">
            {submitError}
          </div>
        )}

        {/* Step counter */}
        <p className="text-center text-[11px] text-[#ADADAD] mt-5 tracking-wide">
          Step {step} of {TOTAL}
        </p>
      </div>
    </div>
  );
}
