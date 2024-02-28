test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

const SERVER_URL = "http://localhost:4000";

const cleanupDB = async () => {
  result = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE"
  })
};

afterEach(async () => {
  await cleanupDB();
});

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  // Code here
  const getNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json"
    }
  });

  const result = await getNoteRes.json();
  const resultStatus = getNoteRes.status;
  expect(resultStatus).toBe(200);
  expect(result.response).toStrictEqual([]); // StrictEqual to not check for reference equality
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // Code here
  /* Adding 2 notes to test. */
  const title1 = "title1";
  const title2 = "title2";
  const content1 = "content1";
  const content2 = "content2";

  const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title1,
      content: content1,
    }),
  });

  const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    }),
  });

  const postNoteBody1 = await postNoteRes1.json();
  const postNoteBody2 = await postNoteRes2.json();
  const postNoteStatus1 = postNoteRes1.status;
  const postNoteStatus2 = postNoteRes2.status;
  expect(postNoteStatus1).toBe(200);
  expect(postNoteBody1.response).toBe("Note added succesfully.");
  expect(postNoteStatus2).toBe(200);
  expect(postNoteBody2.response).toBe("Note added succesfully.");

  const getNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json"
    }
  });

  const result = await getNotesRes.json();
  const resultStatus = getNotesRes.status;
  expect(resultStatus).toBe(200);
  expect(result.response).toHaveLength(2); // Checking for 2 notes returned
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  
  /* Adding a note */
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const postNoteStatus = postNoteRes.status;
  const noteID = postNoteBody.insertedId;
  expect(postNoteStatus).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  /* Deleting the added note */
  const deleteNoteRes = await fetch (`${SERVER_URL}/deleteNote/${noteID}`, {
    method: "DELETE"
  });

  const deleteNoteBody = await deleteNoteRes.json();
  const deleteNoteStatus = deleteNoteRes.status;
  expect(deleteNoteStatus).toBe(200);
  expect(deleteNoteBody.response).toStrictEqual(`Document with ID ${noteID} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  /* Adding a note */
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const postNoteStatus = postNoteRes.status;
  const noteID = postNoteBody.insertedId;
  expect(postNoteStatus).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  /* Patching note */
  const patchNoteRes = await fetch (`${SERVER_URL}/patchNote/${noteID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: "new title",
      content: "new content"
    })
  });

  const patchNoteBody = await patchNoteRes.json();
  const patchNoteStatus = patchNoteRes.status;
  expect(patchNoteStatus).toBe(200);
  expect(patchNoteBody.response).toStrictEqual(`Document with ID ${noteID} patched.`);
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  /* Adding a note */
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const postNoteStatus = postNoteRes.status;
  const noteID = postNoteBody.insertedId;
  expect(postNoteStatus).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  /* Patching note */
  const patchNoteRes = await fetch (`${SERVER_URL}/patchNote/${noteID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: "new title",
    })
  });

  const patchNoteBody = await patchNoteRes.json();
  const patchNoteStatus = patchNoteRes.status;
  expect(patchNoteStatus).toBe(200);
  expect(patchNoteBody.response).toStrictEqual(`Document with ID ${noteID} patched.`);
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  /* Adding a note */
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const postNoteStatus = postNoteRes.status;
  const noteID = postNoteBody.insertedId;
  expect(postNoteStatus).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  /* Patching note */
  const patchNoteRes = await fetch (`${SERVER_URL}/patchNote/${noteID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: "new content"
    })
  });

  const patchNoteBody = await patchNoteRes.json();
  const patchNoteStatus = patchNoteRes.status;
  expect(patchNoteStatus).toBe(200);
  expect(patchNoteBody.response).toStrictEqual(`Document with ID ${noteID} patched.`);
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  /* Adding a note */
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const postNoteStatus = postNoteRes.status;
  const noteID = postNoteBody.insertedId;
  expect(postNoteStatus).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE"
  });

  const deleteAllNotesBody = await deleteAllNotesRes.json();
  const deleteAllNotesStatus = deleteAllNotesRes.status;
  expect(deleteAllNotesStatus).toBe(200);
  expect(deleteAllNotesBody.response).toStrictEqual(`1 note(s) deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  /* Adding 3 notes to test. */
  const title1 = "title1";
  const title2 = "title2";
  const title3 = "title3";
  const content1 = "content1";
  const content2 = "content2";
  const content3 = "content3";

  const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title1,
      content: content1,
    }),
  });

  const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    }),
  });

  const postNoteRes3 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title3,
      content: content3,
    }),
  });

  const postNoteBody1 = await postNoteRes1.json();
  const postNoteBody2 = await postNoteRes2.json();
  const postNoteBody3 = await postNoteRes3.json();
  const postNoteStatus1 = postNoteRes1.status;
  const postNoteStatus2 = postNoteRes2.status;
  const postNoteStatus3 = postNoteRes3.status;
  expect(postNoteStatus1).toBe(200);
  expect(postNoteBody1.response).toBe("Note added succesfully.");
  expect(postNoteStatus2).toBe(200);
  expect(postNoteBody2.response).toBe("Note added succesfully.");
  expect(postNoteStatus3).toBe(200);
  expect(postNoteBody3.response).toBe("Note added succesfully.");

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE"
  });

  const deleteAllNotesBody = await deleteAllNotesRes.json();
  const deleteAllNotesStatus = deleteAllNotesRes.status;
  expect(deleteAllNotesStatus).toBe(200);
  expect(deleteAllNotesBody.response).toStrictEqual(`3 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  /* Adding a note */
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const postNoteStatus = postNoteRes.status;
  const noteID = postNoteBody.insertedId;
  expect(postNoteStatus).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const updateColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteID}`, {
    method: "PATCH",
    body: JSON.stringify({
      color: "#FF0000"
    })
  })

  const updateColorBody = await updateColorRes.json();
  const updateColorStatus = updateColorRes.status;
  expect(updateColorStatus).toBe(200);
  expect(updateColorBody.message).toStrictEqual('Note color updated successfully.');
});