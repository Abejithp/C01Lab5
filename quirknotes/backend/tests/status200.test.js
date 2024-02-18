const SERVER_URL = "http://localhost:4000";

beforeEach(() => {
    //delete all notes
    fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
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
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const getAllNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    //post two notes
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const title2 = "NoteTitleTest2";
    const content2 = "NoteTitleContent2";

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title2,
            content: content2,
        }),
    });

    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const getAllNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(2);

});

test("/deleteNote - Delete a note", async () => {
    //post a note
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

    //delete the note

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const deleteNoteBody = await deleteNoteRes.json();

    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);


});

test("/patchNote - Patch with content and title", async () => {
    //post note
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

    //patch the note
    const newTitle = "NewNoteTitleTest";
    const newContent = "NewNoteTitleContent";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: newTitle,
            content: newContent,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);

});

test("/patchNote - Patch with just title", async () => {
    //post note
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

    //patch the note
    const newTitle = "NewNoteTitleTest";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: newTitle,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);

});

test("/patchNote - Patch with just content", async () => {
    // post note
    const content = "NoteTitleContent";
    const title = "NoteTitleTest";

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

    // patch the note
    const newContent = "NewNoteTitleContent";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: newContent,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);

});

test("/deleteAllNotes - Delete one note", async () => {
    // Post a note
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });


    // Delete all notes
    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const deleteAllNotesBody = await deleteAllNotesRes.json();

    expect(deleteAllNotesRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toBe("1 note(s) deleted.");
});

test("/deleteAllNotes - Delete three notes", async () => {
    // Post three notes
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    // Delete all notes
    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const deleteAllNotesBody = await deleteAllNotesRes.json();

    expect(deleteAllNotesRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toBe("3 note(s) deleted.");

});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    // Post a note
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

    // Update the note color
    const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            color: "#FF0000",
        }),
    });

    const updateNoteColorBody = await updateNoteColorRes.json();

    expect(updateNoteColorRes.status).toBe(200);
    expect(updateNoteColorBody.message).toBe(`Note color updated successfully.`);
});