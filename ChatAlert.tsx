import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  onDecline: () => void;
  farmerName?: string; // Optional: To personalize the message slightly
}

export const ChatAlert: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onAccept,
  onDecline,
  farmerName,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white rounded-lg shadow-xl max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-gray-800">
            {farmerName ? `Chat with ${farmerName}?` : "Start Chat?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mt-2">
            You can now chat directly with your selected farmer to discuss product quality, ask for samples, or clarify any queries before making a purchase.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex justify-end space-x-3">
          <AlertDialogCancel 
            onClick={onDecline} 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Later
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onAccept} 
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Accept & Chat
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
