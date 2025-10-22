output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_id" {
  description = "Public subnet ID"
  value       = aws_subnet.public.id
}

output "private_subnet_id" {
  description = "Private subnet ID"
  value       = aws_subnet.private.id
}

output "rds_endpoint" {
  description = "RDS database endpoint"
  value       = aws_db_instance.postgres.endpoint
}

output "rds_database_name" {
  description = "RDS database name"
  value       = aws_db_instance.postgres.db_name
}

output "rds_username" {
  description = "RDS master username"
  value       = aws_db_instance.postgres.username
  sensitive   = true
}

output "cloudwatch_log_group" {
  description = "CloudWatch log group name"
  value       = aws_cloudwatch_log_group.app.name
}

output "alb_security_group_id" {
  description = "ALB security group ID"
  value       = aws_security_group.alb.id
}

output "eks_security_group_id" {
  description = "EKS security group ID"
  value       = aws_security_group.eks.id
}

output "deployment_info" {
  description = "Deployment information"
  value = {
    vpc_cidr              = var.vpc_cidr
    public_subnet_cidr    = var.public_subnet_cidr
    private_subnet_cidr   = var.private_subnet_cidr
    database_instance     = aws_db_instance.postgres.identifier
    database_engine       = aws_db_instance.postgres.engine
    database_engine_version = aws_db_instance.postgres.engine_version
  }
}

