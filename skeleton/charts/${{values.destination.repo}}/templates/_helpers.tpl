{{- define "common.labels.standard" -}}
app.kubernetes.io/name: renomy-app-template
helm.sh/chart: renomy-app-template
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
component: {{ .Release.Namespace }}
{{- end -}}