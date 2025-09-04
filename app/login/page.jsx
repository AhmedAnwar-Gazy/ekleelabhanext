// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function LoginPage() {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [countryCode, setCountryCode] = useState("966");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Phone:", countryCode + phoneNumber);
//   };

//   return (
//     <div
//       className=" p-10 flex items-center justify-center bg-gray-50 px-4"
//       dir="rtl"
//     >
//       <Card className="w-full max-w-4xl">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-semibold text-gray-900">
//             تسجيل الدخول
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <div className="flex gap-0 border border-gray-200 rounded-md overflow-hidden">
//                 <Select value={countryCode} onValueChange={setCountryCode}>
//                   <SelectTrigger className="w-20 border-none rounded-none border-r border-gray-200">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="966">966</SelectItem>
//                     <SelectItem value="965">965</SelectItem>
//                     <SelectItem value="971">971</SelectItem>
//                     <SelectItem value="973">973</SelectItem>
//                     <SelectItem value="974">974</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Input
//                   type="tel"
//                   placeholder="5xxxxxxxx"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="flex-1 border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 text-right"
//                   dir="ltr"
//                 />
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-black hover:bg-neutral-700 text-white py-6 text-lg"
//             >
//               أرسل الرمز
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
