import { BaseSource, Item } from "https://deno.land/x/ddu_vim@v2.3.0/types.ts";
import { GatherArguments } from "https://deno.land/x/ddu_vim@v2.3.0/base/source.ts";
import { ActionData as GitBranchActionData } from "../@ddu-kinds/git_branch.ts";
import { ActionData as GitTagActionData } from "../@ddu-kinds/git_tag.ts";

type Params = Record<never, never>;

type ActionData = GitBranchActionData | GitTagActionData

export class Source extends BaseSource<Params> {
  kind = ""

  gather(_args: GatherArguments<Params>): ReadableStream<Item<ActionData>[]> {
    const decoder = new TextDecoder()

    return new ReadableStream({
      start(controller) {
        const cmd = new Deno.Command("git", { args: ["show-ref"] });
        const result = cmd.outputSync();
        const stdout = decoder.decode(result.stdout);

        stdout.split(/\r?\n/).forEach((line) => {
          if (line == "") {
            return;
          }

          const gitRef = line.slice(line.indexOf(" ")+1);

          if (gitRef.startsWith("refs/heads/")) {
            const branch = gitRef.slice(gitRef.lastIndexOf("/")+1)
            controller.enqueue([{
              word: branch,
              kind: "git_branch",
              action: { branch: branch },
            }])

            return;
          }

          if (gitRef.startsWith("refs/tags/")) {
            const tag = gitRef.slice(gitRef.lastIndexOf("/")+1)
            controller.enqueue([{
              word: tag,
              kind: "git_tag",
              action: { tag: tag },
            }])

            return;
          }
        })

        controller.close();
      }
    })
  }

  params(): Params {
    return {};
  }
}