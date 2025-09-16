"use client";

import React, { useEffect, useRef, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function OTPInput({
  length = 4,
  onComplete = (value) => {},
  autoFocus = true,
  showResend = true,
  resendSeconds = 30,
  className = "",
}) {
  const [values, setValues] = useState(() => Array(length).fill(""));
  const inputsRef = useRef([]);
  const [secondsLeft, setSecondsLeft] = useState(resendSeconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (autoFocus) inputsRef.current[0]?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (!showResend) return;
    setCanResend(false);
    setSecondsLeft(resendSeconds);
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setCanResend(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [resendSeconds, showResend]);

  useEffect(() => {
    const full = values.every((v) => v !== "");
    if (full) onComplete(values.join(""));
  }, [values, onComplete]);

  const handleChange = (e, idx) => {
    const raw = e.target.value;
    const digit = raw.replace(/[^0-9]/g, "");
    if (!digit) {
      updateAt(idx, "");
      return;
    }

    if (digit.length > 1) {
      const chars = digit.split("").slice(0, length - idx);
      const next = [...values];
      for (let i = 0; i < chars.length; i++) {
        next[idx + i] = chars[i];
      }
      setValues(next);
      const nextEmpty = idx + digit.length - 1;
      inputsRef.current[Math.min(nextEmpty + 1, length - 1)]?.focus();
      return;
    }

    updateAt(idx, digit);
    if (digit && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
      inputsRef.current[idx + 1]?.select();
    }
  };

  const updateAt = (idx, val) => {
    setValues((prev) => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  const handleKeyDown = (e, idx) => {
    const key = e.key;

    if (key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      inputsRef.current[idx - 1]?.focus();
      return;
    }
    if (key === "ArrowRight" && idx < length - 1) {
      e.preventDefault();
      inputsRef.current[idx + 1]?.focus();
      return;
    }

    if ((key === "Backspace" || key === "Delete") && values[idx] === "") {
      if (idx > 0) {
        e.preventDefault();
        updateAt(idx - 1, "");
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").trim().replace(/\s+/g, "");
    const digits = text.replace(/[^0-9]/g, "").slice(0, length);
    if (!digits) return;
    const arr = Array(length).fill("");
    for (let i = 0; i < digits.length; i++) arr[i] = digits[i];
    setValues(arr);
    const focusIdx = Math.min(digits.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    setCanResend(false);
    setSecondsLeft(resendSeconds);
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setCanResend(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  return (
    <div className={cn("w-full", className)}>
      <Label htmlFor="otp" className="mb-2">
        رمز التحقق (OTP)
      </Label>

      <div
        id="otp"
        className="flex gap-2 justify-center items-center"
        role="group"
        aria-label={`OTP input ${length} digits`}
      >
        {Array.from({ length }).map((_, i) => (
          <Input
            key={i}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={values[i]}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            ref={(el) => (inputsRef.current[i] = el)}
            aria-label={`رقم ${i + 1}`}
            className={cn(
              "w-12 h-12 text-center text-lg font-medium rounded-lg focus:shadow-outline",
              values[i] ? "border-2 border-primary" : "border"
            )}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {showResend ? (
            canResend ? (
              <Button size="sm" variant="link" onClick={handleResend}>
                إعادة إرسال الرمز
              </Button>
            ) : (
              <span>إعادة الإرسال خلال {secondsLeft} ثانية</span>
            )
          ) : (
            <span>&nbsp;</span>
          )}
        </div>

        <div className="text-sm">
          <Button
            className="w-[100%]"
            onClick={() => {
              onComplete(values.join(""));
            }}
          >
            تحقق
          </Button>
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        {values.join("")}
      </div>
    </div>
  );
}


// كود خاص بالعرض في نص الشاشة استدعاء الكود من هنا 
export default function OTPDialog({ open, onOpenChange, onSubmit }) {
  const handleComplete = (otp) => {
    console.log("OTP مكتمل:", otp);
    if (onSubmit) onSubmit(otp);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>التحقق من الرمز</DialogTitle>
        </DialogHeader>

        <OTPInput onComplete={handleComplete} />

        <DialogFooter>
          <Button
          className="w-full"
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
