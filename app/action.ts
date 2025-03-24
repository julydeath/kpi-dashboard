"use server";

type ActionState = {
  success: boolean;
  error?: string | null;
  data?: {
    title: string;
    description: string;
    pages: number;
    template: string;
    isPublic: boolean;
  } | null;
};

export async function createOrUpdateLayout(
  prevState: any,
  formData: FormData
): Promise<ActionState> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const pages = Number(formData.get("pages"));
  const template = formData.get("template") as string;
  const isPublic = formData.get("isPublic") === "on";

  // Validation
  if (!title.trim()) {
    return {
      success: false,
      error: "Title is required",
    };
  }

  try {
    // Placeholder for actual layout creation/update logic
    return {
      success: true,
      data: {
        title,
        description,
        pages,
        template,
        isPublic,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to create/update layout",
    };
  }
}
