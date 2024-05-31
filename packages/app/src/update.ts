import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  console.log(`Updating for message:`, message);
  switch (message[0]) {
    case "profile/save":
    saveProfile(message[1], user)
      .then((profile) =>
        apply((model) => ({ ...model, profile }))
      )
      .then(() => {
        const { onSuccess } = message[1];
        if (onSuccess) onSuccess();
      })
      .catch((error: Error) => {
        const { onFailure } = message[1];
        if (onFailure) onFailure(error);
      });
    break;
  }
}

function saveProfile(
    msg: {
      userid: string;
      profile: Profile;
    },
    user: Auth.User
  ) {
    return fetch(`/api/profiles/${msg.userid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...Auth.headers(user)
      },
      body: JSON.stringify(msg.profile)
    })
      .then((response: Response) => {
        if (response.status === 200) return response.json();
        else
        throw new Error(
          `Failed to save profile for ${msg.userid}`
        );
      })
      .then((json: unknown) => {
        if (json) return json as Profile;
        return undefined;
      });
  }