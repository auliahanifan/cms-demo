"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ArticleStatus } from "@prisma/client";
import type { SessionUser } from "@/lib/auth/types";
import {
  canPublish,
  canPublishDirectly,
  canSendBack,
  canSubmitForReview,
  canUnpublish,
} from "@/lib/auth/rbac";
import {
  publishArticleAction,
  sendBackArticleAction,
  submitForReviewAction,
  unpublishArticleAction,
} from "@/lib/actions/articles";
import { Button } from "@/components/ui/button";

export function ArticleWorkflowActions({
  article,
  user,
}: {
  article: { id: string; authorId: string; status: ArticleStatus };
  user: SessionUser;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function run(action: () => Promise<unknown>) {
    startTransition(async () => {
      await action();
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {canSubmitForReview(user, article) && (
        <Button
          type="button"
          disabled={pending}
          onClick={() => run(() => submitForReviewAction(article.id))}
        >
          Kirim untuk Review
        </Button>
      )}
      {canSendBack(user, article) && (
        <Button
          type="button"
          variant="outline"
          disabled={pending}
          onClick={() => run(() => sendBackArticleAction(article.id))}
        >
          Kembalikan ke Penulis
        </Button>
      )}
      {canPublish(user) &&
        (article.status === "PENDING_REVIEW" ||
          (article.status === "DRAFT" && canPublishDirectly(user))) && (
          <Button
            type="button"
            disabled={pending}
            onClick={() => run(() => publishArticleAction(article.id))}
          >
            Publikasikan
          </Button>
        )}
      {canUnpublish(user) && article.status === "PUBLISHED" && (
        <Button
          type="button"
          variant="outline"
          disabled={pending}
          onClick={() => run(() => unpublishArticleAction(article.id))}
        >
          Batalkan Publikasi
        </Button>
      )}
    </div>
  );
}
