import { toast } from "sonner";
import { useEffect, useEffectEvent } from "react";

/**
 * Custom hook to show toast notifications based on async action state.
 *
 * Displays a success toast if `state.success` is true,
 * or an error toast otherwise, using the message in `state.message`.
 * Calls `onAction` callback when the action succeeds.
 *
 * @param {Object} state - The action state object.
 * @param {boolean} state.success - Indicates if the action succeeded.
 * @param {string|null} state.message - Message to display in the toast.
 * @param {Function} [onAction] - Optional callback invoked on success.
 */
export function useToast(state, onAction) {
  const onSuccessEvent = useEffectEvent(() => {
    onAction?.();
  });

  useEffect(() => {
    if (!state.message) return;

    state.success ? toast.success(state.message) : toast.error(state.message);
    if (state.success) onSuccessEvent();
  }, [state.success, state.message]);
}
