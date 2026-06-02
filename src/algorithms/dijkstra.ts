type Graph = {
  [key: string]: {
    node: string
    risk: number
  }[]
}

const graph: Graph = {
  RailwayStation: [
    {
      node: "Jagadamba",
      risk: 8,
    },
    {
      node: "PoliceStation",
      risk: 2,
    },
  ],

  Jagadamba: [
    {
      node: "RKBeach",
      risk: 5,
    },
  ],

  PoliceStation: [
    {
      node: "HospitalJunction",
      risk: 1,
    },
  ],

  HospitalJunction: [
    {
      node: "RKBeach",
      risk: 1,
    },
  ],

  RKBeach: [],
}

export function findSafestRoute(
  start: string,
  end: string
) {
  const risks: Record<string, number> = {}
  const previous: Record<
    string,
    string | null
  > = {}

  const visited = new Set<string>()

  Object.keys(graph).forEach((node) => {
    risks[node] = Infinity
    previous[node] = null
  })

  risks[start] = 0

  while (true) {
    let currentNode: string | null =
      null

    let smallestRisk = Infinity

    for (const node in risks) {
      if (
        !visited.has(node) &&
        risks[node] < smallestRisk
      ) {
        smallestRisk = risks[node]
        currentNode = node
      }
    }

    if (!currentNode) break

    if (currentNode === end) break

    visited.add(currentNode)

    for (const neighbor of graph[
      currentNode
    ]) {
      const newRisk =
        risks[currentNode] +
        neighbor.risk

      if (
        newRisk <
        risks[neighbor.node]
      ) {
        risks[neighbor.node] =
          newRisk

        previous[neighbor.node] =
          currentNode
      }
    }
  }

  const path: string[] = []

  let current: string | null = end

  while (current) {
    path.unshift(current)
    current = previous[current]
  }

  return {
    safestPath: path,
    totalRisk: risks[end],
  }
}